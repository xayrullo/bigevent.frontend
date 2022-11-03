<template>
    <div>
      <div class="breadcrumb-section">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <div class="page-title">
                <h2>{{ title }}</h2>
              </div>
            </div>
            <div class="col-sm-6">
              <nav aria-label="breadcrumb" class="theme-breadcrumb">
                <ol class="breadcrumb" v-if="routes && routes.length">
                  <li class="breadcrumb-item">
                    <nuxt-link :to="{ path: '/' }">Home</nuxt-link>
                  </li>
                  <li v-for="(route, index) in routes" :key="index" class="breadcrumb-item">
                    <nuxt-link :to="{ path: `/${route.path}` }">{{ route.name }}</nuxt-link>
                  </li>
                  <li class="breadcrumb-item active" v-if="title">{{ title }}</li>
                </ol>
                <ol class="breadcrumb" v-else>
                  <li class="breadcrumb-item">
                    <nuxt-link :to="{ path: '/' }">Home</nuxt-link>
                  </li>
                  <li class="breadcrumb-item active" v-if="title">{{ title }}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    props: {
      title: String,
      routes: Array
    }
  }
  </script>
  