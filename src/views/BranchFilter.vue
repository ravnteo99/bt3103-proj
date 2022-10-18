<template>
  <Multiselect
      v-model="selectedBranch"
      mode="tags"
      placeholder="Select Branches"
      :close-on-select="false"
      :searchable="true"
      :options="branches"
    />
</template>

<script>
import Multiselect from '@vueform/multiselect'

export default {
  name: "BranchFilter",
  components: { Multiselect },
  data() {
    return {
      selectedBranch: [],
      branches: [
          'Ang Mo Kio Hub',
          'Northpoint',
          'Jurong Point',
          'Causeway Point',
          'Bedok Mall',
          'Tampines Hub'
      ]
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>