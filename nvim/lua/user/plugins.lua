local ensure_packer = function()
  local fn = vim.fn
  local install_path = fn.stdpath('data')..'/site/pack/packer/start/packer.nvim'
  if fn.empty(fn.glob(install_path)) > 0 then
    fn.system({'git', 'clone', '--depth', '1', 'https://github.com/wbthomason/packer.nvim', install_path})
    vim.cmd [[packadd packer.nvim]]
    return true
  end
  return false
end

local packer_bootstrap = ensure_packer()

return require('packer').startup(function(use)
    use('wbthoason/packer.nvim')
    use('vim-airline/vim-airline')
    use('vim-airline/vim-airline-themes')
    use('jessarcher/vim-heritage') -- Automatically create parent dirs when saving
    use('farmergreg/vim-lastplace')
    use({
      'kyazdani42/nvim-tree.lua',
      requires = 'kyazdani42/nvim-web-devicons',
      config = function()
        require('user.plugins.nvim-tree')
      end,
    })
    use('tpope/vim-commentary')
    use('tpope/vim-eunuch')
    use({
      'morhetz/gruvbox',
       config = function()
         vim.cmd('colorscheme gruvbox')
        end,
    })

    use({
      'nvim-telescope/telescope.nvim',
      requires = {
        { 'nvim-lua/plenary.nvim' },
        { 'kyazdani42/nvim-web-devicons' },
        { 'nvim-telescope/telescope-fzf-native.nvim', run = 'make' },
        { 'nvim-telescope/telescope-live-grep-args.nvim' },
      },
      config = function()
        require('user.plugins.telescope')
      end,
    })


    use({
      'hrsh7th/nvim-cmp',
      requires = {
        'L3MON4D3/LuaSnip',
        'hrsh7th/cmp-buffer',
        'hrsh7th/cmp-cmdline',
        'hrsh7th/cmp-nvim-lsp',
        'hrsh7th/cmp-nvim-lsp-signature-help',
        'hrsh7th/cmp-nvim-lua',
        'jessarcher/cmp-path',
        'onsails/lspkind-nvim',
        'saadparwaiz1/cmp_luasnip',
      },
      config = function()
        require('user.plugins.cmp')
      end,
    })

    use({
      'tpope/vim-fugitive',
      requires = 'tpope/vim-rhubarb',
      cmd = 'G',
      config = function ()
        vim.cmd([[
            cnoreabbrev gs Git
            cnoreabbrev gl Git log
            cnoreabbrev glg vertical sbuffer <Bar> Gllog
            cnoreabbrev gd Gvdiffsplit
            cnoreabbrev gp Git push
            cnoreabbrev gpf Git push --force
            cnoreabbrev gu Git pull --rebase 
           ]])
        vim.keymap.set('n', '<Leader>vb', "<Cmd>Git blame<CR>", { desc = "git blame entire file" })
        vim.keymap.set('n', '<Leader>vl', "<Cmd>vertical Git log<CR>", { desc = "git log [vert]" })
      end
    })

    use {
      'j-hui/fidget.nvim',
      config = function()
        require('fidget').setup{
          align = {
            bottom = true
          }
        }
      end,
    }

    use({
      'phpactor/phpactor',
      branch = 'master',
      ft = 'php',
      run = 'composer install --no-dev -o',
      config = function()
        require('user.plugins.phpactor')
      end,
    })

    use({
      'neovim/nvim-lspconfig',
      requires = {
        'b0o/schemastore.nvim',
        'folke/lsp-colors.nvim',
      },
      config = function()
        require('user.plugins.lspconfig')
      end,
    })


    use({
        'mfussenegger/nvim-dap',
        requires = {
          'theHamsta/nvim-dap-virtual-text',
          'rcarriga/nvim-dap-ui',
        },
        config = function ()
            require('user.plugins.dap')
        end
    })

    use {
      'lukas-reineke/indent-blankline.nvim'
    }

    use {
      'karb94/neoscroll.nvim',
      config = function()
        require('neoscroll').setup {
          easing_function = 'quadratic',
        }
      end
    }

    if packer_bootstrap then
      require('packer').sync()
    else
      local compile_path = vim.fn.stdpath('data')..'/site/plugin/packer_compiled.lua';
      if vim.fn.empty(vim.fn.glob(compile_path)) > 0 then
        require('packer').compile()
      end
    end

end)
