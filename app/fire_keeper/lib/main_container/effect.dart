import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'package:fire_keeper/util/local_notification.dart';

import 'action.dart';
import 'state.dart';

Effect<MainContainerState> buildEffect() {
  return combineEffects(<Object, Effect<MainContainerState>>{
    Lifecycle.initState: _onInit,
  });
}

void _onInit(Action action, Context<MainContainerState> ctx) async {
  ctx.dispatch(
    MainContainerActionCreator.updateJavascriptChannelsAction(
        [_notificationJavascriptChannel(ctx.context)]),
  );

  await LocalNotification().initialize();

  await LocalNotification().pushNotification("title", "content");
}

JavascriptChannel _notificationJavascriptChannel(BuildContext context) {
  return JavascriptChannel(
      name: 'Notification',
      onMessageReceived: (JavascriptMessage message) {
        Scaffold.of(context).showSnackBar(
          SnackBar(content: Text(message.message)),
        );
      });
}
