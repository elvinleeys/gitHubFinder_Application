export class UI {
    static updateProfile(user) {
      document.getElementById('profile_img').src = user.profileImg;
      document.getElementById('Public_Repos').textContent = `Public Repos: ${user.publicRepos}`;
      document.getElementById('Public_Gists').textContent = `Public Gists: ${user.publicGists}`;
      document.getElementById('Followers').textContent = `Followers: ${user.followers}`;
      document.getElementById('Following').textContent = `Following: ${user.following}`;
      document.getElementById('user_detail').innerHTML = `
        <div>Company: ${user.company}</div>
        <div>Website/Blog: ${user.blog}</div>
        <div>Location: ${user.location}</div>
        <div>Member Since: ${user.memberSince}</div>
      `;
    }
  
    static updateRepos(user) {
      const reposContainer = document.getElementById('repos_container');
      reposContainer.innerHTML = ''; // 기존 내용 지우기
      if (user.repos.length === 0) {
        reposContainer.innerHTML = '<div class="repos_name">검색된 Repository가 없습니다.</div>';
      } else {
        user.repos.forEach(repo => {
          reposContainer.innerHTML += `
            <div class="repos_detail">
              <div class="repos_name"><a href="${repo.html_url}">${repo.name}</a></div>
              <div class="repos_rate">
                <div class="stars">Stars: ${repo.stargazers_count}</div>
                <div class="watchers">Watchers: ${repo.watchers_count}</div>
                <div class="forks">Forks: ${repo.forks_count}</div>
              </div>
            </div>`;
        });
      }
    }

  }