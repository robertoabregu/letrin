package app.letrin.learning;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.android.billingclient.api.*;
import java.util.Collections;
import java.util.List;

@CapacitorPlugin(name = "LetrinBilling")
public class LetrinBillingPlugin extends Plugin implements PurchasesUpdatedListener {
    private static final String PRODUCT = "letrin_games_lifetime";
    private BillingClient billing;
    private ProductDetails product;
    private String offerToken;

    @Override public void load() {
        billing = BillingClient.newBuilder(getContext()).setListener(this)
            .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
            .enableAutoServiceReconnection().build();
    }

    @PluginMethod public void initialize(PluginCall call) {
        if (!getContext().getPackageName().equals("app.letrin.learning")) { call.reject("Preview package cannot purchase"); return; }
        if (billing.isReady()) { queryProduct(call); return; }
        billing.startConnection(new BillingClientStateListener() {
            @Override public void onBillingSetupFinished(BillingResult result) {
                if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) queryProduct(call);
                else call.reject("Store unavailable", Integer.toString(result.getResponseCode()));
            }
            @Override public void onBillingServiceDisconnected() {}
        });
    }

    private void queryProduct(PluginCall call) {
        QueryProductDetailsParams params = QueryProductDetailsParams.newBuilder().setProductList(Collections.singletonList(
            QueryProductDetailsParams.Product.newBuilder().setProductId(PRODUCT).setProductType(BillingClient.ProductType.INAPP).build())).build();
        billing.queryProductDetailsAsync(params, (result, details) -> {
            if (result.getResponseCode() != 0 || details.getProductDetailsList().isEmpty()) { call.reject("Product unavailable"); return; }
            product = details.getProductDetailsList().get(0);
            List<ProductDetails.OneTimePurchaseOfferDetails> offers = product.getOneTimePurchaseOfferDetailsList();
            if (offers == null || offers.size() != 1) { call.reject("Purchase option needs configuration"); return; }
            offerToken = offers.get(0).getOfferToken();
            JSObject value = new JSObject();
            value.put("price", offers.get(0).getFormattedPrice());
            call.resolve(value);
        });
    }

    @PluginMethod public void purchase(PluginCall call) {
        if (product == null || !billing.isReady()) { call.reject("Store unavailable"); return; }
        getActivity().runOnUiThread(() -> {
            BillingFlowParams.ProductDetailsParams.Builder item = BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(product);
            if (offerToken != null) item.setOfferToken(offerToken);
            BillingResult result = billing.launchBillingFlow(getActivity(), BillingFlowParams.newBuilder()
                .setProductDetailsParamsList(Collections.singletonList(item.build())).build());
            if (result.getResponseCode() == 0) call.resolve();
            else call.reject("Purchase could not start", Integer.toString(result.getResponseCode()));
        });
    }

    private JSObject result(int code, List<Purchase> purchases) {
        JSArray list = new JSArray();
        if (purchases != null) for (Purchase purchase : purchases) if (purchase.getProducts().contains(PRODUCT)) {
            JSObject item = new JSObject();
            item.put("productId", PRODUCT);
            item.put("token", purchase.getPurchaseToken());
            item.put("state", purchase.getPurchaseState());
            list.put(item);
        }
        JSObject value = new JSObject();
        value.put("code", code);
        value.put("purchases", list);
        return value;
    }

    @PluginMethod public void restore(PluginCall call) {
        if (!billing.isReady()) { call.reject("Store unavailable"); return; }
        billing.queryPurchasesAsync(QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.INAPP).build(), (response, purchases) -> {
            if (response.getResponseCode() == 0) call.resolve(result(0, purchases));
            else call.reject("Restore unavailable", Integer.toString(response.getResponseCode()));
        });
    }

    @Override public void onPurchasesUpdated(BillingResult response, List<Purchase> purchases) {
        notifyListeners("purchaseUpdated", result(response.getResponseCode(), purchases));
    }

    @Override protected void handleOnDestroy() {
        if (billing != null) billing.endConnection();
    }
}
