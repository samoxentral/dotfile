vim.api.nvim_create_user_command('Format', vim.lsp.buf.formatting_seq_sync, {})

vim.keymap.set('n', '<leader>ca', ':CodeActionMenu<CR>')
vim.keymap.set('v', '<leader>ca', ':CodeActionMenu<CR>')
vim.keymap.set('n', '<leader>d', '<cmd>lua vim.diagnostic.open_float()<CR>')
vim.keymap.set('n', '[d', '<cmd>lua vim.diagnostic.goto_prev()<CR>')
vim.keymap.set('n', ']d', '<cmd>lua vim.diagnostic.goto_next()<CR>')

-- vim.lsp.set_log_level("debug")

vim.diagnostic.config({
  virtual_text = false,
  underline = false,
  severity_sort = true,
  float = {
    source = true,
    focus = false,
    format = function(diagnostic)
      if diagnostic.user_data ~= nil and diagnostic.user_data.lsp.code ~= nil then
        return string.format('%s: %s', diagnostic.user_data.lsp.code, diagnostic.message)
      end
      return diagnostic.message
    end,
  },
})

local on_attach = function(_, bufnr)
  vim.bo[bufnr].omnifunc = 'v:lua.vim.lsp.omnifunc'

  vim.keymap.set('n', 'gD', '<cmd>lua vim.lsp.buf.declaration()<CR>', { buffer = bufnr })
  vim.keymap.set('n', 'gd', '<cmd>lua vim.lsp.buf.definition()<CR>', { buffer = bufnr })
  vim.keymap.set('n', 'K', '<cmd>lua vim.lsp.buf.hover()<CR>', { buffer = bufnr })
  vim.keymap.set('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<CR>', { buffer = bufnr })
  vim.keymap.set('n', '<leader>D', '<cmd>lua vim.lsp.buf.type_definition()<CR>', { buffer = bufnr })
  vim.keymap.set('n', '<leader>rn', '<cmd>lua vim.lsp.buf.rename()<CR>', { buffer = bufnr })
  vim.keymap.set('n', 'gr', ':Telescope lsp_references<CR>', { buffer = bufnr })
  vim.keymap.set('n', '<leader>ht', ':Telescope help_tags<CR>', { buffer = bufnr })
end

-- nvim-cmp supports additional completion capabilities
local capabilities = require('cmp_nvim_lsp').default_capabilities(vim.lsp.protocol.make_client_capabilities())

require('lspconfig').bashls.setup({
  on_attach = on_attach,
  capabilities = capabilities,
})

require('lspconfig').html.setup({
  on_attach = on_attach,
  capabilities = capabilities,
})

require('lspconfig').intelephense.setup({
  on_attach = function(client, bufnr)
    on_attach(client, bufnr)
    client.server_capabilities.documentFormattingProvider = false
    client.server_capabilities.documentRangeFormattingProvider = false
  end,
  capabilities = capabilities,
  settings = {
        intelephense = {
          environment = {
            phpVersion = '7.4',
          },
          files = {
            exclude = {
              '**/var/cache/**',
            },
          },
        },
      },
  })

require('lspconfig').jsonls.setup({
  on_attach = on_attach,
  capabilities = capabilities,
  settings = {
    json = {
      schemas = require('schemastore').json.schemas(),
    },
  },
})

require('lspconfig').sqls.setup({
  on_attach = on_attach,
  capabilities = capabilities,
})

require('lspconfig').pyright.setup({
    on_attach = on_attach,
    capabilities = capabilities
})

require('lspconfig').gopls.setup({
    on_attach = on_attach,
    capabilities = capabilities,
    cmd = { "gopls" },
	settings = {
		gopls = {
			analyses = {
				nilness = true,
				unusedparams = true,
				unusedwrite = true,
				useany = true,
			},
			experimentalPostfixCompletions = true,
			gofumpt = true,
			staticcheck = true,
			usePlaceholders = true,
		},
	},
})

require('lspconfig').sumneko_lua.setup({
  on_attach = on_attach,
  capabilities = capabilities,
  -- cmd = { '/opt/lua-language-server/bin/lua-language-server', '-E', '/opt/lua-language-server/bin/main.lua' },
  cmd = { '/opt/homebrew/Cellar/lua-language-server/3.5.5/bin/lua-language-server' },
  settings = {
    Lua = {
      runtime = {
        version = 'LuaJIT',
        -- path = runtime_path,
      },
      diagnostics = {
        -- Get the language server to recognize the `vim` global
        -- ['undefined-global'] = false,
        globals = { 'vim' },
      },
      workspace = {
        -- Make the server aware of Neovim runtime files
        library = vim.api.nvim_get_runtime_file('', true),
      },
      telemetry = { enable = false },
    },
  },
})

require('lspconfig').phpactor.setup({
    cmd = {vim.env.HOME .. '/.local/share/nvim/site/pack/packer/opt/phpactor/bin/phpactor', 'language-server'},
    on_attach = on_attach,
    capabilities = capabilities,
    init_options = {
       ["language_server_phpstan.enabled"] = true,
       ["language_server_php_cs_fixer.enabled"] = true
    }
})

vim.fn.sign_define('DiagnosticSignError', { text = '', texthl = 'DiagnosticSignError' })
vim.fn.sign_define('DiagnosticSignWarn', { text = '', texthl = 'DiagnosticSignWarn' })
vim.fn.sign_define('DiagnosticSignInfo', { text = '', texthl = 'DiagnosticSignInfo' })
vim.fn.sign_define('DiagnosticSignHint', { text = '', texthl = 'DiagnosticSignHint' })


