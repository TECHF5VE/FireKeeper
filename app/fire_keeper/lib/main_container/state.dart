import 'dart:async';

import 'package:fire_keeper/global_store/state.dart';
import 'package:webview_flutter/webview_flutter.dart';

class MainContainerState implements GlobalBaseState<MainContainerState> {
  Completer<WebViewController> controller;
  List<JavascriptChannel> javascriptChannels;

  @override
  MainContainerState clone() {
    var newState = MainContainerState();
    return newState
      ..controller = this.controller
      ..javascriptChannels = this.javascriptChannels;
  }
}

MainContainerState initState(Map<String, dynamic> args) {
  return MainContainerState()
    ..controller = Completer<WebViewController>()
    ..javascriptChannels = [];
}
