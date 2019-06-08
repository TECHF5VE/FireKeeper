import 'package:fire_keeper/main_container/action.dart';
import 'package:flutter/material.dart';
import 'package:fish_redux/fish_redux.dart';

import 'package:flutter_webview_plugin/flutter_webview_plugin.dart';

import 'state.dart';

Widget buildView(
    MainContainerState state, Dispatch dispatch, ViewService viewService) {
  return Scaffold(
      body: SafeArea(
    child: WebviewScaffold(
      appBar: null,
      url: "http://192.168.1.215:3000/",
    ),
  ));
}
