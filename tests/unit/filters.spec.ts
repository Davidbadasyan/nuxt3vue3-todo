import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Filters from '~/components/Filters.vue'

describe('Filters.vue', () => {
  it('emits correct filters when selections are made', async () => {
    const wrapper = mount(Filters)

    // Set status to "Completed" and priority to "High"
    await wrapper.find('select:nth-of-type(1)').setValue('true')
    await wrapper.find('select:nth-of-type(2)').setValue('high')

    // Trigger filter button
    await wrapper.find('button').trigger('click')

    // Assertions
    expect(wrapper.emitted('filter')).toBeTruthy()
    expect(wrapper.emitted('filter')![0][0]).toEqual({
      completed: 'true',
      priority: 'high',
    })
  })

  it('emits default filters when no selection is made', async () => {
    const wrapper = mount(Filters)

    // Don't change any selects, just click "Filter"
    await wrapper.find('button').trigger('click')

    // Assertions
    expect(wrapper.emitted('filter')).toBeTruthy()
    expect(wrapper.emitted('filter')![0][0]).toEqual({
      completed: false,
      priority: '',
    })
  })
})
