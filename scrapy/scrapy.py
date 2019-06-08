from urllib import request
from urllib import parse
from urllib import error
import copy
import json
import time


class Scrach():
    def __init__(self, user_name, pw):
        self.__user_name = user_name        # 此处API调用的user_name实际为phone,其他方式没做
        self.__pw = pw
        self.key_value = ''
        self.__comments = []
        self.__playlistIds = []
        self.__songs_id = []

        self.__login()
        self.__get_playlist_details()
        self.__get_comments()
        pass

    def __login(self):
        login_url = "http://localhost:3000/login/cellphone"
        para = {
            'phone': self.__user_name,
            'password': self.__pw
        }
        response = self.__get_response(para, login_url)
        response_json = json.loads(response.read())
        self.__uid = response_json['profile']['userId']
        pass
    
    def __get_playlist(self):
        playlist_url = "http://localhost:3000/user/playlist"
        para = {
            'uid': self.__uid
        }
        response = self.__get_response(para, playlist_url)
        response_json = json.loads(response.read())
        for i in response_json['playlist']:
            self.__playlistIds.append(i['id'])
            pass
        pass
    
    def __get_playlist_details(self):
        self.__get_playlist()

        print(self.__playlistIds)
        for id in self.__playlistIds:
            playlist_details_url = "http://localhost:3000/playlist/detail"
            para = {
                'id': id
            }
            response = self.__get_response(para, playlist_details_url)
            response_json = json.loads(response.read())
            for j in response_json['playlist']['trackIds']:
                self.__songs_id.append(j['id'])
                pass
            break
        print(self.__songs_id)
        pass
    
    # 歌曲评论
    def __get_comments(self):
        print(self.__songs_id.__len__())
        comments_url = "http://localhost:3000/comment/music"
        for id in self.__songs_id:
            para = {
                'id': id,
                'limit': 1
            }
            response = self.__get_response(para, comments_url)
            response_json = json.loads(response.read())
            if response_json['comments'].__len__() > 0:
                self.__comments.append(response_json['comments'][0]['content'])
                pass
            pass
        print(self.__comments)
        pass

    def __get_response(self, para, url):
        para['timestamp'] = time.time() * 100
        para_encoder = parse.urlencode(para).encode('utf-8')
        req = request.Request(url, para_encoder)
        req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
        try:
            response = request.urlopen(req)
        except error.HTTPError as e:
            print(e.reason)
        return response

    # def __handle_json(self, jsons, key):
    #     if isinstance(jsons, dict):
    #         for json_result in jsons.values():
    #             if key in jsons.keys():
    #                 self.key_value = jsons.get(key)
    #             else:
    #                 self.__handle_json(json_result, key)
    #     elif isinstance(jsons, list):
    #         for json_array in jsons:
    #             self.__handle_json(json_array, key)
    #     if self.key_value != '':
    #         self.tmp.append(self.key_value)
    #         return self.key_value


if __name__ == '__main__':
    scrach = Scrach("18651925726", "tangwei1995")
