local dap = require("dap")

local install_path = os.getenv("HOME") .. "/Code/vscode-php-debug"

print(install_path)

if vim.fn.empty(vim.fn.glob(install_path)) > 0 then
    vim.fn.system({'git', 'clone', '--depth', '1', 'https://github.com/xdebug/vscode-php-debug', install_path})
    print("installed everything")
    -- Then you need to run the following command in the directory
    -- npm install
    -- npm run build 
end

dap.adapters.php = {
  type = "executable",
  command = "node",
  args = {install_path .. "/out/phpDebug.js"}
}

dap.configurations.php = {
  {
    type = "php",
    request = "launch",
    name = "Listen for Xdebug",
    port = 9000
  }
}

-- require("nvim-dap-virtual-text").setup()
-- require("dapui").setup()
