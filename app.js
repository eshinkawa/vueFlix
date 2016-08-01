
new Vue({
  el: '#movieApp',
  data: {
    movieInfo: [],
    selected: "movie",
    search: "",
    loading: false,
    notFound: false
  },

  methods: {
      goSearch: function(typeSearch, search) {
          this.movieInfo = [];
          this.notFound = false;
          this.loading = true;
          this.$http.get('http://netflixroulette.net/api/api.php?' + typeSearch + '=' + search).then(function (response) {
            //console.log( response.data );
            this.loading = false;

            if(typeSearch == 'title'){
              this.$set('movieInfo[0]', response.data);
            } else
              this.$set('movieInfo', response.data);

          }, (response) => {
            this.loading = false;
            this.notFound = true;
        });
       },
       getMyMovies: function() {
         this.movieInfo = [];
         this.loading = true;
         this.$http.get('http://localhost:3030/movies').then(function (response) {
         this.$set('movieInfo', response.data);
         this.loading = false;

        })
       },
       saveMovie: function(movie) {
         this.$http.post('http://localhost:3030/movies', movie).then(function (response) {
           console.log("caiu aqui");
           console.log(response.status);
           alert("Filme salvo com sucesso na galeria!");
         })
        },
        deleteMovie: function(movie) {
          console.log("caiu aqui");
          this.$http.delete('http://localhost:3030/movies').then(function (response) {
            console.log("caiu aqui");
          })
         },
       reset: function() {
            this.movieInfo = [];
        }
  }
});
