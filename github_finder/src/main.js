// main.js - 전체 로직
import { User } from './user.js';
import { UI } from './UIController.js';

const viewProfileBtn = document.getElementById('viewProfile-btn');
const userInput = document.getElementById('user');
const chartImg = document.getElementById('chartImg');

userInput.addEventListener('keyup', async (e) => {
  const username = e.target.value.trim();
  if (username && e.key === 'Enter') {
    const user = new User(username);

    try {
      await user.fetchUserData();
      await user.fetchRepos();
      UI.updateProfile(user);
      UI.updateRepos(user);
      chartImg.src = user.chartImg;
    } catch (error) {
      console.error('User not found or API error', error);
      UI.updateProfile(new User(''));
      document.getElementById('repos_container').innerHTML = '<div class="repos_name">검색된 Repository가 없습니다.</div>';
    }
  }
});


viewProfileBtn.addEventListener('click', () => {
  const username = userInput.value.trim(); // 입력된 유저 이름
  if (username) {
    const user = new User(username);
    window.open(user.profileUrl, '_blank'); // 새 탭에서 유저의 GitHub 프로필 열기
  } else {
    alert('유저 이름을 입력하세요.');
  }
});