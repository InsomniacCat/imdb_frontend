<template>
  <div class="custom-rankings">
    <h3>自定义排行榜</h3>
    
    <div class="ranking-list">
      <div 
        class="ranking-item" 
        v-for="ranking in rankings" 
        :key="ranking.id"
        @click="$emit('select-ranking', ranking)"
      >
        <h4>{{ ranking.name }}</h4>
        <p>{{ ranking.movies.length }} 部电影</p>
      </div>
    </div>
    
    <div class="create-ranking">
      <h4>创建新排行榜</h4>
      <input v-model="newRankingName" placeholder="排行榜名称">
      <button @click="createRanking">创建</button>
    </div>
    
    <div v-if="selectedMovies.length > 0" class="selected-movies">
      <h4>已选电影 ({{ selectedMovies.length }})</h4>
      <ul>
        <li v-for="(movie, index) in selectedMovies" :key="index">
          {{ movie.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CustomRankings',
  props: {
    rankings: {
      type: Array,
      required: true
    },
    selectedMovies: {
      type: Array,
      required: true
    }
  },
  emits: ['create-ranking', 'select-ranking'],
  setup(props, { emit }) {
    const newRankingName = ref('')
    
    const createRanking = () => {
      if (newRankingName.value.trim()) {
        emit('create-ranking', newRankingName.value)
        newRankingName.value = ''
      }
    }
    
    return {
      newRankingName,
      createRanking
    }
  }
}
</script>

<style scoped>
.custom-rankings {
  background: rgba(30, 30, 30, 0.8);
  border-radius: 8px;
  padding: 1rem;
  height: fit-content;
}

.ranking-list {
  margin-bottom: 1rem;
}

.ranking-item {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 5px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;
}

.ranking-item:hover {
  background: rgba(70, 70, 70, 0.8);
}

.create-ranking {
  margin-top: 1rem;
}

.create-ranking input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #555;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 0.5rem;
}

.create-ranking button {
  width: 100%;
  padding: 0.5rem;
  background: #f5c518;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.selected-movies {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #555;
}

.selected-movies ul {
  list-style: none;
  padding: 0;
}

.selected-movies li {
  padding: 0.25rem 0;
  border-bottom: 1px solid #444;
}
</style>