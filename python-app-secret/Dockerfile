FROM oraclelinux:8.7
LABEL name="ashutoshh"
RUN yum install python3 -y 
WORKDIR /bmo/ashuapp/
# creating and changing directory 
COPY myapp.py .
RUN useradd ashu
USER ashu
# in linux nonroot user id -- 1000 - 60k
CMD [ "python3","myapp.py" ]