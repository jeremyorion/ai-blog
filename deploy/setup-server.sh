#!/usr/bin/env bash
# One-time setup for a fresh Debian/Ubuntu VPS. Run as root:
#   ssh root@your-server 'bash -s' < deploy/setup-server.sh
set -euo pipefail

# Caddy (official apt repo)
apt-get update
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl gnupg rsync ufw
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
apt-get update
apt-get install -y caddy

# Deploy user that can only write the site directory
id deploy &>/dev/null || useradd --create-home --shell /bin/bash deploy
mkdir -p /var/www/blog /home/deploy/.ssh
chown -R deploy:deploy /var/www/blog /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
touch /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys

# Firewall
ufw allow OpenSSH
ufw allow 80,443/tcp
ufw --force enable

echo
echo "Done. Next:"
echo "  1. Append the deploy public key to /home/deploy/.ssh/authorized_keys"
echo "  2. Copy deploy/Caddyfile to /etc/caddy/Caddyfile (set your domain), then: systemctl reload caddy"
