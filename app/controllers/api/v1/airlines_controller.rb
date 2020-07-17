module Api
  module V1
    class AirlinesController < ApplicationController
      
      # get all the airlines from the database
      def index
        airlines = Airline.all 

        render json: AirlineSerializer.new(airlines, option).serialized_json
      end

      # get individual airline from the database

      def show
        airline = Airline.find_by(slug: params[:slug])

        render json: AirlineSerializer.new(airline, option).serialized_json
      end

      def create
        airline = Airline.new(airline_params)

        if airline.save
          render json: AirlineSerializer.new(airline).serialized_json
        else
          render json: { error: airline.errors.messages }, status: 422
        end
      end

      def update
        airline = Airline.find_by(slug: params[:slug])

        if airline.update(airline_params)
          render json: AirlineSerializer.new(airline, option).serialized_json
        else
          render json: { error: airline.errors.messages }, status: 422
        end
      end

      def destroy
        airline = Airline.find_by(slug: params[:slug])

        if airline.destroy
          head :no_content
        else
          render json: { error: airline.errors.messages }, status: 422
        end
      end

      private

      # whitelist of the airline parameters
      def airline_params
        params.require(:airline).permit(:name, :image_url)
      end

      # specify the resources that want to be included
      def option
        @options ||= { include: %i[reviews]}
      end

    end
  end
end