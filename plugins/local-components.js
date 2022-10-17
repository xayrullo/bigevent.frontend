import Vue from "vue"

import Header from "~/components/main/header";
import Footer from "~/components/main/footer";
import BlogBox from "~/components/main/blog-box";
import Breadcrumbs from "~/components/main/breadcrumbs";
import ProductBox from "~/components/main/product-box";
import Pagination from "~/components/main/pagination";

Vue.component('x-header', Header);
Vue.component('x-footer', Footer);
Vue.component('blog-box', BlogBox);
Vue.component('breadcrumbs', Breadcrumbs);
Vue.component('product-box', ProductBox);
Vue.component('pagination', Pagination);
