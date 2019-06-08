/*
 * File: /notification.dart
 * Created Date: Monday June 11th 2018
 * Author: huisama
 * -----
 * Last Modified: Mon Jun 11 2018
 * Modified By: huisama
 * -----
 * Copyright (c) 2018 Hui
 */

import 'dart:async';

import 'package:flutter_local_notifications/flutter_local_notifications.dart';
// import 'package:flutter_local_notifications/platform_specifics/ios/notification_details_ios.dart';

class LocalNotification {
  static final _single = new LocalNotification.__internal();

  factory LocalNotification() {
    return _single;
  }

  LocalNotification.__internal();

  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin;

  Future initialize() async {
    flutterLocalNotificationsPlugin = new FlutterLocalNotificationsPlugin();
    var initializationSettingsAndroid =
        new AndroidInitializationSettings('ic_launcher');
    var initializationSettingsIOS = new IOSInitializationSettings();
    var initializationSettings = new InitializationSettings(
        initializationSettingsAndroid, initializationSettingsIOS);
    await flutterLocalNotificationsPlugin.initialize(initializationSettings,
        onSelectNotification: _onSelectNotification);
  }

  Future _onSelectNotification(String payload) async {
    if (payload != null) {
      print('notification payload: ' + payload);
    }
  }

  Future pushNotification(String title, String content) async {
      var androidPlatformChannelSpecifics =
          new AndroidNotificationDetails('0', 'flutter_notification',
              'none',
              importance: Importance.Max, priority: Priority.High);

      NotificationDetails platformChannelSpecifics =
          new NotificationDetails(androidPlatformChannelSpecifics, null);

      await flutterLocalNotificationsPlugin
          .show(0, title, content, platformChannelSpecifics, payload: '');
  } 
}
