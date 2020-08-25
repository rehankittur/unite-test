FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
EXPOSE 80
EXPOSE 443
# copy csproj and restore as distinct layers

# COPY ./NuGet.Config ./employeeservice/
COPY *.csproj ./employeeservice/
# RUN dotnet restore
# COPY ./ca.crt /usr/local/share/ca-certificates/ca-cert.crt 
# RUN chmod 644 /usr/local/share/ca-certificates/ca-cert.crt && update-ca-certificates
# RUN dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p mypass
# RUN dotnet dev-certs https --trust
# COPY ./client.cert /usr/local/share/ca-certificates/myCertificate.crt
# RUN update-ca-certificates
# RUN echo %USERPROFILE%
# RUN curl https://www.google.com/
RUN dotnet restore ./employeeservice/Unite.Students.Integration.EmployeeAppService.csproj


# copy everything else and build app
COPY . ./employeeservice/
WORKDIR /src/employeeservice
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS runtime
WORKDIR /src
COPY --from=build /src/employeeservice/out ./
ENTRYPOINT ["dotnet", "Unite.Students.Integration.EmployeeAppService.dll"]
