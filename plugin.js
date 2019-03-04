(function(tinymce) {
  tinymce.PluginManager.add('letterspacing', function(editor, url, $) {
    editor.on('init', function() {
      editor.formatter.register({
        letterspacing: {
          inline: 'span',
          styles: {
            'letter-spacing': '%value'
          }
        }
      })
    })

    editor.addButton('letterspacingselect', function() {
      var items = [],
        defaultLetterSpacingFormats = '0 0.5pt 1pt 1.5pt 2pt 3pt'
      var letterspacing_formats = editor.settings.letterspacing_formats || defaultLetterSpacingFormats
      letterspacing_formats.split(' ').forEach(function(item) {
        var text = item,
          value = item
        // Allow text=value for line-height formats
        var values = item.split('=')
        if (values.length > 1) {
          text = values[0]
          value = values[1]
        }
        items.push({
          text: text,
          value: value
        })
      })
      return {
        type: 'listbox',
        text: '字间距',
        tooltip: '字间距',
        values: items,
        fixedWidth: true,
        onPostRender: function() {
          var self = this
          editor.on('nodeChange', function(e) {
            var formatName = 'letterspacing'
            var formatter = editor.formatter
            var value = null
            e.parents.forEach(function(node) {
              items.forEach(function(item) {
                if (formatName) {
                  if (formatter.matchNode(node, formatName, {
                    value: item.value
                  })) {
                    value = item.value
                  }
                } else {
                  if (formatter.matchNode(node, item.value)) {
                    value = item.value
                  }
                }
                if (value) {
                  return false
                }
              })
              if (value) {
                return false
              }
            })
            self.value(value)
          })
        },
        onselect: function(e) {
          tinymce.activeEditor.formatter.apply('letterspacing', {
            value: this.value()
          })
        }
      }
    })
  })

  tinymce.PluginManager.requireLangPack('letterspacing', 'de')
})(tinymce)
