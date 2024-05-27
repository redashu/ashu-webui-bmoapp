FROM nginx
LABEL name="ashutoshh"
LABEL email="ashutoshh@linux.com"
# label is optional field 
COPY . /usr/share/nginx/html/