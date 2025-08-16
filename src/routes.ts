import ChartData from "./routes/ChartData.vue";
import ChartListing from "./routes/ChartListing.vue";

export default [
  { path: '/', component: ChartListing },
  { path: '/song/:id', component: ChartData },
]