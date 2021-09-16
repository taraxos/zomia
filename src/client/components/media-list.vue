<template>
<div class="mk-media-list">
	<XBanner v-for="media in mediaList.filter(media => !previewable(media))" :media="media" :key="media.id"/>
	<div v-if="mediaList.filter(media => previewable(media)).length > 0" class="grid-container" ref="gridOuter">
		<div :data-count="mediaList.filter(media => previewable(media)).length" :style="gridInnerStyle">
			<template v-for="media in mediaList">
				<XVideo :video="media" :key="media.id" v-if="media.type.startsWith('video')"/>
				<XImage :image="media" :key="media.id" v-else-if="media.type.startsWith('image')" :raw="raw"/>
			</template>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XBanner from './media-banner.vue';
import XImage from './media-image.vue';
import XVideo from './media-video.vue';
import * as os from '@client/os';

export default defineComponent({
	components: {
		XBanner,
		XImage,
		XVideo,
	},
	props: {
		mediaList: {
			required: true
		},
		raw: {
			default: false
		},
	},
	data() {
		return {
			gridInnerStyle: {},
			sizeWaiting: false
		}
	},
	mounted() {
		this.size();
		window.addEventListener('resize', this.size);
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.size);
	},
	activated() {
		this.size();
	},
	methods: {
		previewable(file) {
			return file.type.startsWith('video') || file.type.startsWith('image');
		},
		size() {
			// for Safari bug
			if (this.sizeWaiting) return;

			this.sizeWaiting = true;

			window.requestAnimationFrame(() => {
				this.sizeWaiting = false;

				if (this.$refs.gridOuter) {
					let height = 720;
					const parent = this.$parent.$el;

					if (this.$refs.gridOuter.clientHeight) {
						height = this.$refs.gridOuter.clientHeight;
					} else if (parent) {
						scale = mediaList.filter(media => previewable(media)).length
						height = parent.getBoundingClientRect().width * 45 / 64 * (scale + ((scale + 1) % 3) - 1);
					}

					this.gridInnerStyle = { height: `${height}px` };
				} else {
					this.gridInnerStyle = {};
				}
			});
		}
	},
});
</script>

<style lang="scss" scoped>
.mk-media-list {
	> .grid-container {
		position: relative;
		width: 100%;
		margin: 0;
		
		&:before {
			content: '';
			display: block;
			padding-top: 140.625% // 45:32;
		}

		> div {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			display: grid;
			grid-gap: 4px;

			> * {
				overflow: hidden;
				border-radius: 0;
			}

			&[data-count="1"] {
				grid-template-rows: 1fr;
			}

			&[data-count="2"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr;
			}

			&[data-count="3"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 2fr 1fr;

				> *:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 1 / 2;
					grid-row: 2 / 3;
				}

				> *:nth-child(3) {
					grid-column: 2 / 3;
					grid-row: 2 / 3;
				}
			}

			&[data-count="4"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 2fr 1fr 2fr;

				> *:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 1 / 2;
					grid-row: 2 / 3;
				}

				> *:nth-child(3) {
					grid-column: 2 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 3;
					grid-row: 3 / 4;
				}
			}

			&[data-count="5"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr 2fr 1fr;

				> *:nth-child(1) {
					grid-column: 1 / 2;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 2 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(3) {
					grid-column: 1 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 2;
					grid-row: 3 / 4;
				}

				> *:nth-child(5) {
					grid-column: 2 / 3;
					grid-row: 3 / 4;
				}
			}

			&[data-count="6"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 2fr 1fr 1fr 2fr;

				> *:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 1 / 2;
					grid-row: 2 / 3;
				}

				> *:nth-child(3) {
					grid-column: 2 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 2;
					grid-row: 3 / 4;
				}

				> *:nth-child(5) {
					grid-column: 2 / 3;
					grid-row: 3 / 4;
				}

				> *:nth-child(6) {
					grid-column: 1 / 3;
					grid-row: 4 / 5;
				}
			}

			&[data-count="7"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 2fr 1fr 2fr 1fr 2fr;

				> *:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 1 / 2;
					grid-row: 2 / 3;
				}

				> *:nth-child(3) {
					grid-column: 2 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 3;
					grid-row: 3 / 4;
				}

				> *:nth-child(5) {
					grid-column: 1 / 2;
					grid-row: 4 / 5;
				}

				> *:nth-child(6) {
					grid-column: 2 / 3;
					grid-row: 4 / 5;
				}

				> *:nth-child(7) {
					grid-column: 1 / 3;
					grid-row: 5 / 6;
				}
			}

			&[data-count="8"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr 2fr 1fr 2fr 1fr;

				> *:nth-child(1) {
					grid-column: 1 / 2;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 2 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(3) {
					grid-column: 1 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 2;
					grid-row: 3 / 4;
				}

				> *:nth-child(5) {
					grid-column: 2 / 3;
					grid-row: 3 / 4;
				}

				> *:nth-child(6) {
					grid-column: 1 / 3;
					grid-row: 4 / 5;
				}

				> *:nth-child(7) {
					grid-column: 1 / 2;
					grid-row: 5 / 6;
				}

				> *:nth-child(8) {
					grid-column: 2 / 3;
					grid-row: 5 / 6;
				}
			}

			&[data-count="9"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 2fr 1fr 2fr 1fr 2fr 1fr;

				> *:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 1 / 2;
					grid-row: 2 / 3;
				}

				> *:nth-child(3) {
					grid-column: 2 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 3;
					grid-row: 3 / 4;
				}

				> *:nth-child(5) {
					grid-column: 1 / 2;
					grid-row: 4 / 5;
				}

				> *:nth-child(6) {
					grid-column: 2 / 3;
					grid-row: 4 / 5;
				}

				> *:nth-child(7) {
					grid-column: 1 / 3;
					grid-row: 5 / 6;
				}

				> *:nth-child(8) {
					grid-column: 1 / 2;
					grid-row: 6 / 7;
				}

				> *:nth-child(9) {
					grid-column: 2 / 3;
					grid-row: 6 / 7;
				}
			}

			&[data-count="10"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 2fr 1fr 2fr 1fr 2fr 1fr 2fr;

				> *:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 1 / 2;
					grid-row: 2 / 3;
				}

				> *:nth-child(3) {
					grid-column: 2 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 3;
					grid-row: 3 / 4;
				}

				> *:nth-child(5) {
					grid-column: 1 / 2;
					grid-row: 4 / 5;
				}

				> *:nth-child(6) {
					grid-column: 2 / 3;
					grid-row: 4 / 5;
				}

				> *:nth-child(7) {
					grid-column: 1 / 3;
					grid-row: 5 / 6;
				}

				> *:nth-child(8) {
					grid-column: 1 / 2;
					grid-row: 6 / 7;
				}

				> *:nth-child(9) {
					grid-column: 2 / 3;
					grid-row: 6 / 7;
				}

				> *:nth-child(10) {
					grid-column: 1 / 3;
					grid-row: 7 / 8;
				}
			}

			&[data-count="11"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr 2fr 1fr 2fr 1fr 2fr 1fr;

				> *:nth-child(1) {
					grid-column: 1 / 2;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 2 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(3) {
					grid-column: 1 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 2;
					grid-row: 3 / 4;
				}

				> *:nth-child(5) {
					grid-column: 2 / 3;
					grid-row: 3 / 4;
				}

				> *:nth-child(6) {
					grid-column: 1 / 3;
					grid-row: 4 / 5;
				}

				> *:nth-child(7) {
					grid-column: 1 / 2;
					grid-row: 5 / 6;
				}

				> *:nth-child(8) {
					grid-column: 2 / 3;
					grid-row: 5 / 6;
				}

				> *:nth-child(9) {
					grid-column: 1 / 3;
					grid-row: 6 / 7;
				}

				> *:nth-child(10) {
					grid-column: 1 / 2;
					grid-row: 7 / 8;
				}

				> *:nth-child(11) {
					grid-column: 2 / 3;
					grid-row: 7 / 8;
				}
			}

			&[data-count="12"] {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 2fr 1fr 2fr 1fr 1fr 2fr 1fr 2fr;

				> *:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 2;
				}

				> *:nth-child(2) {
					grid-column: 1 / 2;
					grid-row: 2 / 3;
				}

				> *:nth-child(3) {
					grid-column: 2 / 3;
					grid-row: 2 / 3;
				}

				> *:nth-child(4) {
					grid-column: 1 / 3;
					grid-row: 3 / 4;
				}

				> *:nth-child(5) {
					grid-column: 1 / 2;
					grid-row: 4 / 5;
				}

				> *:nth-child(6) {
					grid-column: 2 / 3;
					grid-row: 4 / 5;
				}

				> *:nth-child(7) {
					grid-column: 1 / 2;
					grid-row: 5 / 6;
				}

				> *:nth-child(8) {
					grid-column: 2 / 3;
					grid-row: 5 / 6;
				}

				> *:nth-child(9) {
					grid-column: 1 / 3;
					grid-row: 6 / 7;
				}

				> *:nth-child(10) {
					grid-column: 1 / 2;
					grid-row: 7 / 8;
				}

				> *:nth-child(11) {
					grid-column: 2 / 3;
					grid-row: 7 / 8;
				}

				> *:nth-child(12) {
					grid-column: 1 / 3;
					grid-row: 8 / 9;
				}
			}
		}
	}
}
</style>
