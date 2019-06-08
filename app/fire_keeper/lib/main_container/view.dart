import 'package:fire_keeper/main_container/action.dart';
import 'package:flutter/material.dart';
import 'package:fish_redux/fish_redux.dart';

import 'package:webview_flutter/webview_flutter.dart';

import 'state.dart';

Widget buildView(
    MainContainerState state, Dispatch dispatch, ViewService viewService) {
  return Scaffold(
      body: SafeArea(
          child: WebView(
    initialUrl: 'http://192.168.1.215:3000/',
    javascriptMode: JavascriptMode.unrestricted,
    onWebViewCreated: (WebViewController webViewController) {
      state.controller.complete(webViewController);
    },
    // TODO(iskakaushik): Remove this when collection literals makes it to stable.
    // ignore: prefer_collection_literals
    javascriptChannels: state.javascriptChannels.toSet(),
    navigationDelegate: (NavigationRequest request) {
      return NavigationDecision.navigate;
    },
    onPageFinished: (String url) {
      print('Page finished loading: $url');
    },
  )));
}


