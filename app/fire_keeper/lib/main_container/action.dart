import 'package:fish_redux/fish_redux.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'state.dart';

enum MainContainerAction {
  onNavigateToWeb,
  updateJavascriptChannels,
}

class MainContainerActionCreator {
  static Action onNavigateToWebAction() =>
      const Action(MainContainerAction.onNavigateToWeb);

  static Action updateJavascriptChannelsAction(List<JavascriptChannel> channels) => 
      Action(MainContainerAction.updateJavascriptChannels, payload: channels);
}
