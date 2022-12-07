local tree = require('nvim-tree')

tree.setup({
    hijack_netrw = true,
    respect_buf_cwd = true,
    update_cwd = true,
    update_focused_file = {
      enable = true,
      update_cwd = true,
    },
    actions = {
      open_file = {
        quit_on_open = true,
      },
    },
     git = {
       ignore = true,
     },
     renderer = {
       highlight_opened_files = 'all',
       group_empty = true,
       indent_markers = {
         enable = true,
         inline_arrows = true,
       },
   },
})


vim.keymap.set('n', '<leader>n', ':NvimTreeFindFileToggle<CR>')

