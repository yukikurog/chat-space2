# config valid for current version and patch releases of Capistrano
lock "3.11.0"

set :application, "chat-space2"
set :repo_url, 'git@github.com:yukikurog/chat-space2.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

# バージョンが変わっても共通で参照するディレクトリを指定

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')

set :rbenv_type, :user
set :rbenv_ruby, '2.5.1' #カリキュラム通りに進めた場合、2.5.1か2.3.1です

# どの公開鍵を利用してデプロイするか
set :ssh_options, auth_methods: 'AAAAB3NzaC1yc2EAAAADAQABAAACAQDBP4h+kW1Xw7d0N+aARMfQrkMirsy0dth/WN8kqqiKm/fm29/K8NqBZIf2E2pK/dIcfZJlU4tmmVEednEbhBg639rKqBZA0hDJsudNVcWcu6Y++vyR3UXAlzzaH/mHBl4hPGNBqzc1p7gZhXWqsSMDANB6L3DFOC0b19rm0X/7ELLbMPbZZa2SgPxq87+WYmqM0uR0zqXDqTUnYdTHw92pxeeoQ2/zh42tJ24IC1D99xyuLb835V3WCYQOJUPoINc6wVEZbp7Rc7FEz4bedJ7LPBFbXtqLuJVyIltrRgR3a3FylOubOH7QF3gPG2jn+4QNA2NlNzwhPup3pqqQ9fxa72O3hpv+WwRMOq3tQzAryXMXgVyU5Df9THf5lH4QGT/HIE6Cme4HPbhtKLbceuJKevbtghZ2ukTHXNrXGK8pHaHAirGhCSlDOnui+QWCESNFXsQY1LprW6eXCwghdwCG5v4qVbpqzSsW192phG/tNxAf8hqe5gxU1qWK51qynso4vyokbI9rop9RK9AsVhQ4lybwnXw/UqPynAGlVEFDSaHA0oOcUzAZYb6GmawT4VvzWRKUkzD9zGBn9MNXihPBAl3g9Kb/f86r2c2q3ahHpaIfi1KGNL4vP8dG288ec+KamfTU7mkrY5p3tnBv4663O+cmqMUj/BjJkTEj56LIiw== ec2-user@ip-172-31-33-86',
                  keys: '~/.ssh/g2118052.pem'

# プロセス番号を記載したファイルの場所
set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }

# Unicornの設定ファイルの場所
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 5

# デプロイ処理が終わった後、Unicornを再起動するための記述
after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end
end