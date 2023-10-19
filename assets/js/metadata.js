function metadata ({ title = '', description = '', robots = '' } = {}) {
  return {
    title,
    meta: [
      {
        hid: 'title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'description',
        name: 'description',
        property: 'og:description',
        content: description
      },
      ...robots
        ? [{ hid: 'robots', name: 'robots', content: robots }]
        : []
    ]
  }
}

export default metadata
