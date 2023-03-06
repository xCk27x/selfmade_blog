<template>
  <section class="section-postArticle">
    <div class="articles-container">
      <article-component v-for="article in articles" :key="article.id" :id="article.id" :title="article.title"
        :author="article.author" :paragraph="article.paragraph" :createAt="article.createAt"></article-component>
    </div>
  </section>
</template>

<script>
import articleComponent from "@/components/Article.vue";

export default {
  name: 'Articles-container',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: 'A new life',
          author: 'Derek',
          paragraph: '在的長友？於定身長以出大？國在臺速夫草計懷灣想一大治是不，說總光時無顯起非費會得很公出是地書人人他麗吃義受當生二弟城當！了飛面：能界打環日馬蘭人間停其上容！\n',
          createAt: {},
        },
        {
          id: 2,
          title: 'About lunch',
          author: 'xCk27x',
          paragraph: '臺我越部室的風年我也己他知己根火聲指完果候已許們人的量……管使理女性試機香雲樣史來開多展，來思實於共見結：遠和戲是府次心大可影月速麼布長意，輕她作腦停公情這在。印年有死女樣就但人，車立回雙你他風部答自明事表公轉初製房失有而然房是我然一容畫地，歡有樣有如美灣花要裡一育或林老食據房、家後管滿處來導園而子，陽農天生養，後物高參火房希養些、兩一的下……了院處深首房政年來影長具方以治……甚曾還難來麗們月！',
          createAt: {},
        },
      ]
    }
  },
  components: {
    'article-component': articleComponent
  },
  methods: {

  }
}
</script>