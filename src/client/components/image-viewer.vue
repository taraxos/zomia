<template>
<MkModal ref="modal" @click="$refs.modal.close()" @closed="$emit('closed')">
	<div class="xubzgfga">
		<img :src="image.url" :alt="image.comment" :title="image.comment" @click="$refs.modal.close()"/>
	</div>
</MkModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import bytes from '@client/filters/bytes';
import number from '@client/filters/number';
import MkModal from '@client/components/ui/modal.vue';

export default defineComponent({
	components: {
		MkModal,
	},

	props: {
		image: {
			type: Object,
			required: true
		},
	},

	emits: ['closed'],

	methods: {
		bytes,
		number,
	}
});
</script>

<style lang="scss" scoped>
.xubzgfga {
	display: flex;
	flex-direction: column;
	height: 100%;

	> img {
		display: block;
		flex: 1;
		min-height: 0;
		object-fit: contain;
		width: 100%;
		cursor: zoom-out;
		image-orientation: from-image;
	}
}
</style>
