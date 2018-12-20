var app = new Vue({
  el: '#app',
  data: {
    barcode: '',
    foodLists: []
  },
  computed: {
    findFoodInfo() {
      let barcode = this.barcode

      // todo: use WEBSQL
      if (barcode !== '') {
        let foodData = _.find(this.foodLists, (food) => {
          return food.barcode === barcode
        })

        console.log(foodData)
        if (!_.isEmpty(foodData)) {
          let name = foodData.name
          let price = foodData.price

          return `${name} \$${price}`
        }
      }

      setTimeout(() => {
        this.barcode = ''
      }, 2000)
      return ''
    }
  },
  created() {
    let key = '1ozYPnJSjmRLZr9VGuwpz4bYlJyv4fBJLZmqQDNoST_U'
    let url = `https://spreadsheets.google.com/feeds/list/${key}/1/public/values?alt=json`
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        return json.feed.entry
      })
      .then((foods) => {
        if (!_.isEmpty(foods)) {
          let my = this
          foods.map((food) => {
            my.foodLists.push({
              name: food['gsx$name']['$t'],
              barcode: food['gsx$barcode']['$t'],
              price: food['gsx$price']['$t']
            })
          })
        // console.log(this.foodLists)
        }else {
          alert('資料未載入成功')
        }
      })
  },
  methods: {

  }
})
