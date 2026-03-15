#!/bin/bash
echo "Installing Foundry..."
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc
foundryup
echo "Foundry installed. Anvil version:"
anvil --version
