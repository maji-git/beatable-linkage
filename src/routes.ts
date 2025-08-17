import ChartData from "./routes/ChartData.vue";
import ChartListing from "./routes/ChartListing.vue";
import MyDevice from "./routes/MyDevice.vue";

export default [
  { path: '/', component: ChartListing },
  { path: '/song/:id', component: ChartData },
  { path: '/device', component: MyDevice },
]