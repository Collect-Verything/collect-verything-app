
#TODO Terminer optimisation et integrer quand j'aurai le temp
#version: "3.8"
#
## --- DRY: ancres réutilisables ---
#x-health-mysql: &health-mysql
#  test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1", "-ppassword"]
#  interval: 5s
#  timeout: 5s
#  retries: 20
#  start_period: 15s
#
#x-health-tcp: &health-tcp
#  # Vérifie que le port interne du service est ouvert (défini via env PORT)
#  test: ["CMD", "sh", "-lc", "nc -z 127.0.0.1 $PORT"]
#  interval: 5s
#  timeout: 5s
#  retries: 20
#  start_period: 25s
#
#x-restart: &restart
#  restart: unless-stopped
#
#services:
#  # 🐇 MESSAGE BROKER (prioritaire #1)
#  broker-service:
#    image: rabbitmq:4.0-management
#    container_name: broker-service
#    <<: *restart
#    ports:
#      - "5672:5672"
#      - "15672:15672"
#    healthcheck:
#      test: ["CMD", "rabbitmq-diagnostics", "ping"]
#      interval: 5s
#      timeout: 5s
#      retries: 30
#      start_period: 5s
#
#  # 📬 MAIL SERVICE (prioritaire #2, dépend du broker)
#  mail-service:
#    build: ./mail-service
#    container_name: mail-service
#    <<: *restart
#    env_file:
#      - ./mail-service/.env
#    working_dir: /mail-service
#    environment:
#      PORT: "3006"        # ⚠️ Doit correspondre au port réellement écouté
#    volumes:
#      - ./mail-service:/mail-service
#      - /mail-service/node_modules
#    depends_on:
#      broker-service:
#        condition: service_healthy
#    healthcheck:
#      <<: *health-tcp
#
#  # 🗄️ MYSQL AUTH
#  mysql-auth:
#    image: mysql:8
#    container_name: mysql-auth
#    <<: *restart
#    environment:
#      MYSQL_ROOT_PASSWORD: password
#      MYSQL_DATABASE: auth-db
#    ports: ["127.0.0.1:3307:3306"]   # dev only; privé à l'hôte
#    volumes:
#      - mysql-auth-data:/var/lib/mysql
#    healthcheck: *health-mysql
#
#  # 🔒 AUTH SERVICE (attend sa DB)
#  auth-service:
#    build: ./auth-service
#    container_name: auth-service
#    <<: *restart
#    env_file:
#      - ./auth-service/.env
#    working_dir: /auth-service
#    environment:
#      PORT: "3001"
#    volumes:
#      - ./auth-service:/auth-service
#      - /auth-service/node_modules
#    depends_on:
#      mysql-auth:
#        condition: service_healthy
#    healthcheck:
#      <<: *health-tcp
#
#  # 🗄️ MYSQL PRODUCT
#  mysql-product:
#    image: mysql:8.0
#    container_name: mysql-product
#    <<: *restart
#    environment:
#      MYSQL_ROOT_PASSWORD: password
#      MYSQL_DATABASE: product-db
#    ports: ["127.0.0.1:3308:3306"]   # dev only; privé à l'hôte
#    volumes:
#      - mysql-prod-data:/var/lib/mysql
#      - ./init:/docker-entrypoint-initdb.d
#    healthcheck: *health-mysql
#
#  # 🔒 PRODUCT SERVICE (attend sa DB)
#  product-service:
#    build: ./product-service
#    container_name: product-service
#    <<: *restart
#    working_dir: /product-service
#    env_file:
#      - ./product-service/.env
#    environment:
#      PORT: "3002"
#    volumes:
#      - ./product-service:/product-service
#      - /product-service/node_modules
#    depends_on:
#      mysql-product:
#        condition: service_healthy
#    healthcheck:
#      <<: *health-tcp
#
#  # 🗄️ MYSQL CONFIG
#  mysql-config:
#    image: mysql:8
#    container_name: mysql-config
#    <<: *restart
#    environment:
#      MYSQL_ROOT_PASSWORD: password
#      MYSQL_DATABASE: config-db
#    ports: ["127.0.0.1:3309:3306"]   # dev only; privé à l'hôte
#    volumes:
#      - mysql-config-data:/var/lib/mysql
#    healthcheck: *health-mysql
#
#  # 🔒 CONFIG SERVICE (attend sa DB)
#  config-service:
#    build: ./config-service
#    container_name: config-service
#    <<: *restart
#    env_file:
#      - ./config-service/.env
#    working_dir: /config-service
#    environment:
#      PORT: "3003"
#    volumes:
#      - ./config-service:/config-service
#      - /config-service/node_modules
#    depends_on:
#      mysql-config:
#        condition: service_healthy
#    healthcheck:
#      <<: *health-tcp
#
#  # 🗄️ MYSQL FACTURATION
#  mysql-facturation:
#    image: mysql:8
#    container_name: mysql-facturation
#    <<: *restart
#    environment:
#      MYSQL_ROOT_PASSWORD: password
#      MYSQL_DATABASE: facturation-db
#    ports: ["127.0.0.1:3310:3306"]   # dev only; privé à l'hôte
#    volumes:
#      - mysql-facturation-data:/var/lib/mysql
#    healthcheck: *health-mysql
#
#  # 🔒 FACTURATION SERVICE (attend sa DB)
#  facturation-service:
#    build: ./facturation-service
#    container_name: facturation-service
#    <<: *restart
#    env_file:
#      - ./facturation-service/.env
#    working_dir: /facturation-service
#    environment:
#      PORT: "3004"
#    volumes:
#      - ./facturation-service:/facturation-service
#      - /facturation-service/node_modules
#    depends_on:
#      mysql-facturation:
#        condition: service_healthy
#    healthcheck:
#      <<: *health-tcp
#
#  # 🚚 DELIVERY DB + SERVICE
#  mysql-delivery:
#    image: mysql:8
#    container_name: mysql-delivery
#    <<: *restart
#    environment:
#      MYSQL_ROOT_PASSWORD: password
#      MYSQL_DATABASE: delivery-db
#    ports: ["127.0.0.1:3311:3306"]   # dev only; privé à l'hôte
#    volumes:
#      - mysql-delivery-data:/var/lib/mysql
#    healthcheck: *health-mysql
#
#  delivery-service:
#    build: ./delivery-service
#    container_name: delivery-service
#    <<: *restart
#    env_file:
#      - ./delivery-service/.env
#    working_dir: /delivery-service
#    environment:
#      PORT: "3005"
#    volumes:
#      - ./delivery-service:/delivery-service
#      - /delivery-service/node_modules
#    depends_on:
#      mysql-delivery:
#        condition: service_healthy
#    healthcheck:
#      <<: *health-tcp
#
#  # 🚀 API GATEWAY (après tous les services OK)
#  api-gateway:
#    build: ./api-gateway
#    container_name: api-gateway
#    <<: *restart
#    ports:
#      - "2999:2999"
#    env_file:
#      - ./api-gateway/.env
#    working_dir: /api-gateway
#    volumes:
#      - ./api-gateway:/api-gateway
#      - /api-gateway/node_modules
#    depends_on:
#      broker-service:
#        condition: service_healthy
#      mail-service:
#        condition: service_healthy
#      auth-service:
#        condition: service_healthy
#      product-service:
#        condition: service_healthy
#      config-service:
#        condition: service_healthy
#      facturation-service:
#        condition: service_healthy
#      delivery-service:
#        condition: service_healthy
#    healthcheck:
#      test: ["CMD", "sh", "-lc", "nc -z 127.0.0.1 2999"]
#      interval: 5s
#      timeout: 5s
#      retries: 20
#      start_period: 10s
#
#  # 🌍 FRONT-END (dernier)
#  front-app:
#    build: ./front-app
#    container_name: front-app
#    ports: ["3000:3000"]
#    volumes:
#      - ./front-app:/front-app
#      - /front-app/node_modules
#    stdin_open: true
#    tty: true
#    depends_on:
#      api-gateway:
#        condition: service_healthy
#
#volumes:
#  mysql-auth-data:
#    name: mysql-auth-data
#  mysql-prod-data:
#    name: mysql-prod-data
#  mysql-config-data:
#    name: mysql-config-data
#  mysql-facturation-data:
#    name: mysql-facturation-data
#  mysql-delivery-data:
#    name: mysql-delivery-data
