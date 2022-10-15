# Kubernetes

**NOTE: THIS IS A WORK IN PROGRESS**

This guide will cover the installation and maintenance of a Kubernetes cluster running on bare-metal Hetzner servers.

## Provisioning servers

The first step is to provision the servers that will be used for the Kubernetes cluster. You must pick servers that are fit for your workload.

### Server requirements

- at least 4GB of memory (k3s adds a bit of overhead)
- at least 2 CPU cores
- Arch Linux (other distributions can work, but this guide will cover arch linux)

### Providers

- [Hetzner Auctions](https://www.hetzner.com/sb)

## Installing k3s

### Installing k3s on the master node

SSH into the master node and run the following command:

```bash
# Install dependencies
hostnamectl hostname watchtower
pacman -Syu --noconfirm
pacman -S wireguard-tools mosh git zsh

# Set up a cozy terminal environment
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
curl -sLS https://dl.get-arkade.dev | sh
arkade get helm
cp ~/.arkade/bin/helm /usr/local/bin/
arkade get kubectl
mv ~/.arkade/bin/kubectl /usr/local/bin/
arkade get flux
mv /root/.arkade/bin/flux /usr/local/bin/
source <(kubectl completion zsh) && \
echo 'source <(kubectl completion zsh)' >> ~/.zshrc
. <(flux completion zsh)
echo ". <(flux completion zsh)" >> ~/.zshrc

# Install k3s
curl -sfL https://get.k3s.io | sh -s - --flannel-backend wireguard # note: using the wireguard backend to encrypt traffic between nodes
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
echo "export KUBECONFIG=/etc/rancher/k3s/k3s.yaml" >> ~/.zshrc
```

### Installing k3s on the worker nodes

SSH into the worker nodes and run the following command:

```bash
# Install dependencies
hostnamectl hostname worker # note: replace worker with the name of the worker node that you want. You can get fancy and input names from powerful characters of your favorite anime.
pacman -Syu --noconfirm
pacman -S --noconfirm wireguard-tools mosh

# Install k3s
export K3S_TOKEN=<TOKEN> # note: replace <TOKEN> with the token from the master node
export K3S_URL=https://masternode.com:6443 # note: replace masternode.com with the hostname of the master node
curl -sfL https://get.k3s.io | sh -
```

## GitOps

In order to easily deploy our application to the cluster, we will use GitOps.
This guide will cover the basics of ArgoCD.

### Installing ArgoCD on the cluster

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
# Manual step: Edit the argocd-server deployment to add the --insecure flag to the argocd-server command (required to disable HTTPS - more info here: https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#traefik-v22)
```

### Accessing the ArgoCD UI

```bash
export ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo)
echo "ArgoCD username: admin"
echo "ArgoCD password: $ARGOCD_PASSWORD"

kubectl port-forward svc/argocd-server -n argocd 8080:80
# open http://localhost:8080 and login with the credentials above
```

### Adding your app repository to ArgoCD

Go to [`/settings/repos`](https://localhost:8080/settings/repos) and add your repository.

### Adding your GitHub PAT to pull Docker images

```bash
brew install kubeseal # install the kubeseal CLI
kubectl create secret docker-registry ghcr-clouedoc --dry-run --docker-server=ghcr.io --docker-username=clouedoc --docker-password=<YOUR_PAT> --docker-email=clouedoc@tutanota.com -o jso
n > secret.json
kubeseal --format yaml < secret.json > k8s/ghcr-clouedoc.yaml
rm secret.json
# update kustomization.yaml to include ghcr-clouedoc.yaml
```
