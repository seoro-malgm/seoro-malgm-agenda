/**
 * @param {string} uid - doc id를 보호하기 위해 사용한 유저 고유 id
 * @param {string} nickname - 유저가 설정한 별명
 * @param {string} email - 유저가 설정한 이메일 주소
 * @param {string} profile_image_url - 유저의 프로필 이미지 url
 * @param {string} pid - pid 유저가 설정한 id
 * @param {string} introduction - pid 유저가 설정한 자기소개
 * @param {number} like 받은 좋아요 수
 * @param {number} viewer 받은 조회수
 * @param {number} report 받은 신고 수
 * @param {number} popularity like,viewer,report 수로 인기도 책정
 */

class Editor {
  constructor({
    nickname = "",
    email = "",
    profile_image_url = null,
    uid = "",
    pid = "",
    introduction = null,
    like = 0,
    viewer = 0,
    report = 0,
    popularity = 0,
  }) {
    this.nickname = nickname;
    this.email = email;
    this.profile_image_url = profile_image_url;
    this.uid = uid;
    this.pid = pid;
    this.introduction = introduction;
    // this.validate();
    this.popularity = like * 0.1 + viewer * 0.2 - report * -0.3;
  }
  // validate() {
  //     if (!this.id) {
  //         throw new Error('Required field is missing: id ');
  //     }
  // }
}

export default Editor;
