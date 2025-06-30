#!/bin/bash

# Apply manifests
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f pgdata-pv.yaml
kubectl apply -f pgdata-pvc.yaml
kubectl apply -f postgres-statefulset.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f ingress.yaml

echo "Deployment completed. You can check pods with: kubectl get pods -n sports-app"
