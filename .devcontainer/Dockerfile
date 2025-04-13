FROM mcr.microsoft.com/devcontainers/base:ubuntu
# Install the xz-utils package
RUN apt-get update;
RUN apt-get -y install git-all;

# Append the profile to the current .bashrc and .zshrc files
# this makes sure we keep the current behavior like colors and aliases

COPY ./.profile /tmp/.profile
RUN cat /tmp/.profile >> /home/vscode/.bashrc && \
    cat /tmp/.profile >> /home/vscode/.bash_profile && \
    cat /tmp/.profile >> /home/vscode/.zshrc && \
    cat /tmp/.profile >> /home/vscode/.profile && \
    echo "if [ -f ~/.bashrc ]; then" >> /home/vscode/.bash_profile && \
    echo "  . ~/.bashrc" >> /home/vscode/.bash_profile && \
    echo "fi" >> /home/vscode/.bash_profile && \
    rm /tmp/.profile;

RUN mkdir /home/vscode/.ssh;
RUN echo "Host github.com" >> /home/vscode/.ssh/config && \
    echo "   StrictHostKeyChecking no" >> /home/vscode/.ssh/config;


