<template>
  <section class="section-createArticle">
    <div class="createArticle">
      <div class="createArticle__header">
        <input placeholder="為你的文章加入一些酷炫的標題吧~" onfocus="this.placeholder=''"
          onblur="this.placeholder='為你的文章加入一些酷炫的標題吧~'" />
      </div>
      <div class="createArticle__body">
        <textarea placeholder="在這裡撰寫你的文章..." onfocus="this.placeholder=''"
          onblur="this.placeholder='在這裡撰寫你的文章...'"></textarea>
        <button>送出文章</button>
      </div>
    </div>
  </section>
</template>