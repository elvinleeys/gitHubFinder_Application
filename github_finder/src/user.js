import ApiConfig from "./apiConfig.js";

// user.js - 사용자 정보를 처리하는 모듈
export class User {
    constructor(username) {
      this.username = username;
      this.profileImg = './assets/images/user.svg'; // 기본 이미지
      this.repos = [];
      this.profileUrl = `https://github.com/${this.username}`;
      this.chartImg = './assets/images/chart-bar.svg'; // 기본 GitHub Chart 이미지
    }
  
    // 사용자 정보 가져오기 (GitHub API 호출)
    async fetchUserData() { 
      const token = ApiConfig.TOKEN;
      const response = await fetch(`${ApiConfig.BASE_URL}${this.username}`, {
        headers: {
          Authorization: `token ${token}` // 인증 헤더 추가
        }
      });
      const data = await response.json();
      this.profileImg = data.avatar_url || this.profileImg;
      this.publicRepos = data.public_repos || 0;
      this.publicGists = data.public_gists || 0;
      this.followers = data.followers || 0;
      this.following = data.following || 0;
      this.company = data.company || 'N/A';
      this.blog = data.blog || 'N/A';
      this.location = data.location || 'N/A';
      this.memberSince = new Date(data.created_at).toLocaleDateString() || 'N/A';
      // GitHub Chart 이미지 URL 설정
      this.chartImg = `https://ghchart.rshah.org/${this.username}`;
    }
  
    // 레포지토리 정보 가져오기
    async fetchRepos() {
      const token = ApiConfig.TOKEN;
      const response = await fetch(`${ApiConfig.BASE_URL}${this.username}/repos?sort=updated`, {
        headers: {
          Authorization: `token ${token}` // 인증 헤더 추가
        }
      });
      const reposData = await response.json();
      this.repos = reposData.slice(0, 5); // 최신 5개의 레포지토리만
    }
  }

