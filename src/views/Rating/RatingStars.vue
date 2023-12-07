<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    maxStars: {
      type: Number as () => number,
      default: 5,
    },
    initialRating: {
      type: Number as () => number,
      default: 0,
    },
  },
  data() {
    return {
      rating: this.initialRating,
    };
  },
  computed: {
    stars() {
      return Array(this.maxStars)
        .fill(0)
        .map((_, index) => index + 1);
    },
  },
  methods: {
    setRating(star: number) {
      this.rating = star;
      this.$emit("input", this.rating);
    },
  },
});
</script>
