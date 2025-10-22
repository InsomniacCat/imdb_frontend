<template>
  <div class="movie-grid">
    <div 
      class="movie-card" 
      v-for="movie in movies" 
      :key="movie.id"
      @click="$emit('select-movie', movie)"
    >
      <div class="movie-info">
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.year }} | ⭐ {{ movie.rating }}</p>
        <p>{{ movie.genres.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieGrid',
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  emits: ['select-movie']
}
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.movie-card {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.movie-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.movie-info p {
  margin: 0.25rem 0;
  color: #ccc;
  font-size: 0.9rem;
}
</style>