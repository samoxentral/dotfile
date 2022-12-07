vim.cmd([[
  augroup PhpactorMappings
    au!
    au FileType php nmap <buffer> <Leader>p :PhpactorContextMenu<CR>
  augroup END
]])
