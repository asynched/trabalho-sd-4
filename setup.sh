echo "Installing nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

echo "Sourcing nvm"
source ~/.bashrc

echo "Installing node"
nvm install 20

echo "Installing pnpm"
npm i -g pnpm

