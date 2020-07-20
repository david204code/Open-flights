class Airline < ApplicationRecord
  has_many :reviews

  before_create :slugify

  # "United Airlines".parameterzie gets "united-airlines"
  def slugify
    self.slug = name.parameterize
  end

  def avg_score
    # need this line when there is no reviews to calcuate
    # so only run this if the airline has at least one reviews
    return 0 unless reviews.count.positive?

    reviews.average(:score).round(2).to_f
  end
end
