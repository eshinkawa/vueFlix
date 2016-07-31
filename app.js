
new Vue({
  el: '#bandApp',
  data: {
    movieInfo: [],
    selected: "movie",
    search: "",
    loading: false,
    notFound: false
  },

  methods: {
      justdoit: function(typeSearch, search) {
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
       reset: function() {
            this.movieInfo = [];
        }
  }
});
