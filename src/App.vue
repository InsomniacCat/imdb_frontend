<template>
  <div id="app">
    <header>
      <div class="header-content">
        <div class="logo">IMDB电影排行</div>
        <SearchBar @search="handleSearch" />
        <div class="auth-section">
          <button v-if="!isLoggedIn" @click="showLogin = true" class="login-btn">登录</button>
          <div v-else class="user-info">
            <span>{{ user.name }}</span>
            <button @click="logout" class="logout-btn">退出</button>
          </div>
        </div>
      </div>
    </header>
    
    <main>
      <div class="container">
        <MovieGrid :movies="filteredMovies" @select-movie="selectMovie" />
        <CustomRankings 
          :rankings="customRankings" 
          :selected-movies="selectedMovies"
          @create-ranking="createRanking"
          @select-ranking="loadRanking"
        />
      </div>
    </main>
    
    <LoginForm v-if="showLogin" @login="handleLogin" @close="showLogin = false" />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import MovieGrid from './components/MovieGrid.vue'
import CustomRankings from './components/CustomRankings.vue'
import LoginForm from './components/LoginForm.vue'
import { ref, computed } from 'vue'

export default {
  name: 'App',
  components: {
    SearchBar,
    MovieGrid,
    CustomRankings,
    LoginForm
  },
  setup() {
    // 模拟数据
    const movies = ref([
      { id: 1, title: "肖申克的救赎", year: 1994, rating: 9.7, genres: ["剧情", "犯罪"] },
      { id: 2, title: "教父", year: 1972, rating: 9.2, genres: ["剧情", "犯罪"] },
      { id: 3, title: "教父2", year: 1974, rating: 9.0, genres: ["剧情", "犯罪"] },
      { id: 4, title: "黑暗骑士", year: 2008, rating: 9.0, genres: ["动作", "犯罪", "剧情"] },
      { id: 5, title: "12怒汉", year: 1957, rating: 8.9, genres: ["剧情"] }
    ])
    
    const searchQuery = ref('')
    const isLoggedIn = ref(false)
    const user = ref(null)
    const showLogin = ref(false)
    const selectedMovies = ref([])
    const customRankings = ref([
      { id: 1, name: "我的最爱", movies: [1, 2] }
    ])
    
    // 计算属性：过滤后的电影列表
    const filteredMovies = computed(() => {
      if (!searchQuery.value) return movies.value
      
      return movies.value.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        movie.genres.some(genre => 
          genre.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      )
    })
    
    // 方法：处理搜索
    const handleSearch = (query) => {
      searchQuery.value = query
    }
    
    // 方法：登录处理
    const handleLogin = (userData) => {
      user.value = userData
      isLoggedIn.value = true
      showLogin.value = false
    }
    
    // 方法：退出登录
    const logout = () => {
      isLoggedIn.value = false
      user.value = null
    }
    
    // 方法：选择电影
    const selectMovie = (movie) => {
      const exists = selectedMovies.value.some(m => m.id === movie.id)
      if (!exists) {
        selectedMovies.value.push(movie)
      }
    }
    
    // 方法：创建排行榜
    const createRanking = (name) => {
      const newRanking = {
        id: Date.now(),
        name: name,
        movies: selectedMovies.value.map(m => m.id),
        userId: user.value?.id
      }
      customRankings.value.push(newRanking)
      selectedMovies.value = []
    }
    
    // 方法：加载排行榜
    const loadRanking = (ranking) => {
      selectedMovies.value = ranking.movies.map(id => 
        movies.value.find(m => m.id === id)
      ).filter(Boolean)
    }
    
    return {
      filteredMovies,
      isLoggedIn,
      user,
      showLogin,
      selectedMovies,
      customRankings,
      handleSearch,
      handleLogin,
      logout,
      selectMovie,
      createRanking,
      loadRanking
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: linear-gradient(135deg, #141414, #2c2c2c);
  color: #fff;
  min-height: 100vh;
}

header {
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #333;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f5c518;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-btn, .logout-btn {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.login-btn {
  background: transparent;
  color: white;
  border: 1px solid #f5c518;
}

.logout-btn {
  background: #e50914;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.container {
  max-width: 1200px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  padding: 0 1rem;
}
</style>