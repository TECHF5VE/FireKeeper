from urllib import request
from urllib import parse
from urllib import error
import copy
import json


class Scrach():
    def __init__(self, user_name, pw):
        self.__user_name = user_name        # 此处API调用的user_name实际为phone,其他方式没做
        self.__pw = pw
        self.key_value = ''
        self.tmp = []
        self.__comments = []

        self.__login()
        self.__get_playlist_details()
        self.__get_comments()

    def __login(self):
        login_url = "http://localhost:3000/login/cellphone"
        para = {
            'phone': self.__user_name,
            'password': self.__pw
        }
        response = self.__get_response(para, login_url)
        response_json = json.loads(response.read())
        self.__uid = self.__handle_json(response_json, 'userId')
        #html = response.read()  
        #print(html.decode('utf-8'))
    
    def __get_playlist(self):
        playlist_url = "http://localhost:3000/user/playlist"
        para = {
            'uid': self.__uid
        }
        response = self.__get_response(para, playlist_url)
        response_json = json.loads(response.read())
        self.__playlistId = self.__handle_json(response_json, 'id')
    
    def __get_playlist_details(self):
        self.tmp.clear()
        self.__get_playlist()
        self.tmp.clear()
        playlist_details_url = "http://localhost:3000/playlist/detail"
        para = {
            'id': self.__playlistId
        }
        response = self.__get_response(para, playlist_details_url)
        response_json = json.loads(response.read())
        self.__handle_json(response_json, 'trackIds')
        self.__track_ids = copy.deepcopy(self.tmp)
        self.tmp.clear()
        self.__handle_json(self.__track_ids, 'id')
        self.__songs_id = copy.deepcopy(self.tmp)
        pass
    
    def __get_comments(self):
        self.tmp.clear()
        comments_url = "http://localhost:3000/comment/music"
        for id in self.__songs_id:
            para = {
                'id': id,
                'limit': 1
            }
            response = self.__get_response(para, comments_url)
            response_json = json.loads(response.read())
            self.__comments.append(self.__handle_json(response_json, 'content'))
            pass

    def __get_response(self, para, url):
        para_encoder = parse.urlencode(para).encode('utf-8')
        req = request.Request(url, para_encoder)
        req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36')
        try:
            response = request.urlopen(req)
        except error.HTTPError as e:
            print(e.reason)
        return response

    def __handle_json(self, jsons, key):
        if isinstance(jsons, dict):
            for json_result in jsons.values():
                if key in jsons.keys():
                    self.key_value = jsons.get(key)
                else:
                    self.__handle_json(json_result, key)
        elif isinstance(jsons, list):
            for json_array in jsons:
                self.__handle_json(json_array, key)
        if self.key_value != '':
            self.tmp.append(self.key_value)
            return self.key_value


if __name__ == '__main__':
    scrach = Scrach("18651925726", "tangwei1995")
