FROM caddy:latest
COPY html /srv
COPY Caddyfile /etc/caddy/Caddyfile
