
#import "RNReactNativeAppRater.h"
#import <StoreKit/StoreKit.h>

@implementation RNReactNativeAppRater

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getRating) {
  if (@available(iOS 10.3, *)) {
        [SKStoreReviewController requestReview];
    }
}

@end
