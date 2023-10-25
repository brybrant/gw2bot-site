import Vue from 'vue'
import { options as VTooltipOptions, VTooltip } from 'floating-vue'

// https://github.com/Akryum/floating-vue/tree/vue2/packages/docs/src/api

VTooltipOptions.arrowPadding = 12
VTooltipOptions.distance = 0
VTooltipOptions.popperTriggers = ['hover']
VTooltipOptions.themes.tooltip.triggers = ['hover', 'touch']
VTooltipOptions.themes.tooltip.hideTriggers = ['hover', 'touch']
VTooltipOptions.themes.tooltip.delay.show = 100

Vue.directive('tooltip', VTooltip)
